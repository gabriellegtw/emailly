// Define the Email Type
// include the word "export" to use it in other files
export interface Email {
    email_id: number;
    user_email: string;
    content: string;
    created_at: Date;
    updated_at: Date;
  }