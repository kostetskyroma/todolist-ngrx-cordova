export interface TodoItem {
  id?: number;
  title: string;
  description?: string;
  dueDate?: Date | string;
  photo?: string;
  done: boolean;
}
