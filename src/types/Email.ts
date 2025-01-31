// Define the Email Type
// include the word "export" to use it in other files
export interface Email {
    // Allow null so it can be passed through the api and be detected as false 
    email_id: number | null;
    user_email: string;
    content: string;
    created_at: Date;
    updated_at: Date;
  }