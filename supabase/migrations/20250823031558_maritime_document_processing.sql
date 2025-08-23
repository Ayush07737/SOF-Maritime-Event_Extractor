-- Location: supabase/migrations/20250823031558_maritime_document_processing.sql
-- Schema Analysis: Creating new maritime document processing infrastructure
-- Integration Type: Addition - Document management and event extraction system
-- Dependencies: auth.users (existing), storage.buckets (managed by Supabase)

-- 1. Types for document processing
CREATE TYPE public.document_status AS ENUM ('uploading', 'processing', 'completed', 'failed');
CREATE TYPE public.document_type AS ENUM ('pdf', 'docx', 'doc');
CREATE TYPE public.event_type AS ENUM ('arrival', 'departure', 'loading', 'discharging', 'inspection', 'delay', 'other');

-- 2. Core tables for document management
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    original_file_name TEXT NOT NULL,
    file_type public.document_type NOT NULL,
    file_size BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    status public.document_status DEFAULT 'uploading',
    processing_started_at TIMESTAMPTZ,
    processing_completed_at TIMESTAMPTZ,
    processing_duration_seconds INTEGER,
    events_count INTEGER DEFAULT 0,
    error_message TEXT,
    is_sample BOOLEAN DEFAULT false,
    sample_dataset_id TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.extracted_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
    event_description TEXT NOT NULL,
    event_type public.event_type DEFAULT 'other',
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    vessel_name TEXT,
    port_name TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX idx_documents_user_id ON public.documents(user_id);
CREATE INDEX idx_documents_status ON public.documents(status);
CREATE INDEX idx_documents_created_at ON public.documents(created_at);
CREATE INDEX idx_extracted_events_document_id ON public.extracted_events(document_id);
CREATE INDEX idx_extracted_events_start_time ON public.extracted_events(start_time);

-- 4. Storage bucket for document uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'maritime-documents',
    'maritime-documents',
    false, -- Private bucket for user documents
    52428800, -- 50MB limit
    ARRAY[
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
    ]
);

-- 5. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extracted_events ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies - Following Pattern 1 and 2
-- Pattern 1: Core user table
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for documents
CREATE POLICY "users_manage_own_documents"
ON public.documents
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 2: Events belong to user through document relationship
CREATE POLICY "users_access_own_document_events"
ON public.extracted_events
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.documents d 
        WHERE d.id = extracted_events.document_id 
        AND d.user_id = auth.uid()
    )
);

-- 7. Storage RLS Policies
-- Users can view their own uploaded documents
CREATE POLICY "users_view_own_documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'maritime-documents' 
    AND owner = auth.uid()
);

-- Users can upload documents to their folder
CREATE POLICY "users_upload_own_documents" 
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'maritime-documents' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update/delete their own documents
CREATE POLICY "users_manage_own_document_files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'maritime-documents' AND owner = auth.uid())
WITH CHECK (bucket_id = 'maritime-documents' AND owner = auth.uid());

CREATE POLICY "users_delete_own_document_files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'maritime-documents' AND owner = auth.uid());

-- 8. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Function to update document updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON public.documents
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Sample data for testing
DO $$
DECLARE
    test_user_id UUID := gen_random_uuid();
    sample_doc_id UUID := gen_random_uuid();
BEGIN
    -- Create a test user profile (auth.users would be created via Supabase Auth)
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES (
        test_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'demo@maritime.com', crypt('demo123', gen_salt('bf', 10)), now(), now(), now(),
        '{"full_name": "Demo User"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
        false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    );

    -- Create sample processed document
    INSERT INTO public.documents (id, user_id, file_name, original_file_name, file_type, file_size, storage_path, status, processing_completed_at, processing_duration_seconds, events_count)
    VALUES (
        sample_doc_id,
        test_user_id,
        'sample_sof_mv_atlantic_star.pdf',
        'SOF_MV_ATLANTIC_STAR_Hamburg_Aug2024.pdf',
        'pdf',
        2457600,
        'documents/sample_sof_mv_atlantic_star.pdf',
        'completed',
        now() - INTERVAL '1 hour',
        45,
        8
    );

    -- Create sample extracted events
    INSERT INTO public.extracted_events (document_id, event_description, event_type, start_time, end_time, vessel_name, port_name)
    VALUES
        (sample_doc_id, 'Vessel arrival at Port of Hamburg', 'arrival', '2024-08-20T08:30:00Z', '2024-08-20T09:15:00Z', 'MV Atlantic Star', 'Hamburg'),
        (sample_doc_id, 'Cargo loading operations commenced', 'loading', '2024-08-20T10:00:00Z', '2024-08-20T14:30:00Z', 'MV Atlantic Star', 'Hamburg'),
        (sample_doc_id, 'Bunker fuel delivery', 'other', '2024-08-20T15:00:00Z', '2024-08-20T16:45:00Z', 'MV Atlantic Star', 'Hamburg'),
        (sample_doc_id, 'Port authority inspection', 'inspection', '2024-08-21T09:00:00Z', '2024-08-21T11:30:00Z', 'MV Atlantic Star', 'Hamburg'),
        (sample_doc_id, 'Cargo discharge operations', 'discharging', '2024-08-21T13:00:00Z', '2024-08-21T18:00:00Z', 'MV Atlantic Star', 'Hamburg'),
        (sample_doc_id, 'Vessel departure from port', 'departure', '2024-08-21T19:30:00Z', '2024-08-21T20:15:00Z', 'MV Atlantic Star', 'Hamburg'),
        (sample_doc_id, 'Weather delay - Heavy fog', 'delay', '2024-08-22T06:00:00Z', '2024-08-22T08:30:00Z', 'MV Atlantic Star', 'Hamburg'),
        (sample_doc_id, 'Pilot boarding at sea', 'other', '2024-08-22T14:00:00Z', '2024-08-22T14:30:00Z', 'MV Atlantic Star', 'Hamburg');

EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Test user already exists, skipping sample data creation';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating sample data: %', SQLERRM;
END $$;