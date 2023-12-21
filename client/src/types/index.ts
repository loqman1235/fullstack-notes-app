export interface NoteCardProps {
  _id: string;
  title: string;
  text: string;
}

export interface INote {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateNote {
  title: string;
  text: string;
}

type ErrorType = {
  type?: string;
  value?: string;
  msg?: string;
  path?: string;
  location?: string;
};

export interface IApiError {
  response: {
    data: {
      error?: string;
      errors?: ErrorType[];
    };
  };
}
