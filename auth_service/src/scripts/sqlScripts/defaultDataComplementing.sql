INSERT INTO "TasksManagerScheduler_type_documents"(
    type_document_id, 
    name, 
    "createdAt", 
    "updatedAt", 
    "deletedAt"
    ) values(generate_uuid_v4(), 'Citizen ID', now(), now(), null),(2, 'Card ID', now(), now(), null),(2, 'Card ID foreing', now(), now(), null);