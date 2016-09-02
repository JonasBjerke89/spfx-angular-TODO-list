import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-client-preview';

import ModuleLoader from '@microsoft/sp-module-loader';
import * as strings from 'spFxSample1Strings';
import { ISpFxSample1WebPartProps } from './ISpFxSample1WebPartProps';
import * as angular from 'angular';
import './app/app-module';
import template from './app-view';
import styles from './SpFxSample1.module.scss'

export default class SpFxSample1WebPart extends BaseClientSideWebPart<ISpFxSample1WebPartProps> {
private $injector: ng.auto.IInjectorService;
  public constructor(context: IWebPartContext) {
    super(context);

    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {
    if (this.renderedOnce === false) {
      //Load from angular template
      this.domElement.innerHTML = template.templateHtml;

      this.$injector = angular.bootstrap(this.domElement, ['todoapp']);
    }

    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      sharePointApi: this.properties.sharePointApi,
      todoListName: this.properties.todoListName,
      hideFinishedTasks: this.properties.hideFinishedTasks
    });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion:true,
          groups: [
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('sharePointApi', {
                  label: strings.SharePointApiUrlFieldLabel
                })
              ]
            },
            {
              groupName: 'Data - Second group',
              groupFields: [
                PropertyPaneTextField('todoListName', {
                  label: strings.ToDoListNameFieldLabel
                })
              ]
            }
          ]
        },
        {
          header: {
            description: 'Page 2 - Header'
          },
          groups: [
              {
              groupName: strings.ViewGroupName,
              groupFields: [
                PropertyPaneToggle('hideFinishedTasks', {
                  label: strings.HideFinishedTasksFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
