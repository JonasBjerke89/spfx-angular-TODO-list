declare interface ISpFxSample1Strings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  ViewGroupName: string;
  SharePointApiUrlFieldLabel: string;
  ToDoListNameFieldLabel: string;
  HideFinishedTasksFieldLabel: string;
}

declare module 'spFxSample1Strings' {
  const strings: ISpFxSample1Strings;
  export = strings;
}
