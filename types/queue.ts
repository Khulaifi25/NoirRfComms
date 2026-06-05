export type QueueOrder = {
    id: number;
    client_name: string;
    status: string;
    created_at: string;

    commission_types?: {
        name: string;
    } | null;
};