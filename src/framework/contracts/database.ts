export interface Migration {
  migrate(): Promise<boolean>;
}

export interface SeederContract {
  fill(): Promise<boolean>;
}
