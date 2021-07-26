import { Command } from 'commander';

export interface CustomCommand extends Command {
  interactive?: boolean;
  typescript?: boolean;
}

export interface FileCopy {
  src: string;
  dest: string;
}
