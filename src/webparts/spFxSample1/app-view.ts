import styles from './SpFxSample1.module.scss';
export default class appview {
    public static templateHtml: string =  `
    <div class="${styles.toDoWebPart}">
  <div data-ng-controller="HomeController as vm">
    <div class="${styles.configurationNeeded}" ng-show="vm.configurationNeeded">
      Please configure the Web Part
    </div>
    <div ng-show="vm.configurationNeeded === false">
      <div class="${styles.loading}" ng-show="vm.isLoading">
        <uif-spinner>Loading...</uif-spinner>
      </div>
      <div><span class="ms-font-su">To-Do List</span></div>

    <div class="ms-Grid" id="entryform" ng-show="vm.isLoading === false">
        <div class="ms-Grid-row">
            <div class="ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg10"><uif-textfield uif-label="New to do:" uif-underlined ng-model="vm.newItem" ng-keydown="vm.todoKeyDown($event)"></uif-textfield>
            </div>
            <div class="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg2">
              <button class="ms-Button ms-Button--primary" ng-model="vm.newItem" ng-click="vm.todoAdd($event)">
              <span class="ms-Button-icon"><i class="ms-Icon ms-Icon--plus"></i></span>
              <span class="ms-Button-label">Add</span>
              <span class="ms-Button-description">Add a new task</span>
              </button>
            </div>
        </div>
        <div class="ms-Grid-row">
          <div class="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <uif-list id="items" ng-show="vm.isLoading === false" >
            <uif-list-item ng-repeat="todo in vm.todoCollection" uif-item="todo">
            <uif-list-item-primary-text ng-class="{'${styles.done}': todo.done}">{{todo.title}}</uif-list-item-primary-text>
              <uif-list-item-primary-text>
                <div class="ms-Persona ms-Persona--xs">
                  <div class="ms-Persona-imageArea">
                    <img class="ms-Persona-image" src="{{todo.pictureUrl}}">
                </div>

                  <div class="ms-Persona-details">
                    <div class="ms-Persona-primaryText">{{todo.author}}</div>
                  </div>
                </div>
              </uif-list-item-primary-text>
              <uif-list-item-secondary-text>Created {{todo.created}}</uif-list-item-primary-text>
              <uif-list-item-actions>
                <uif-list-item-action ng-click="vm.completeTodo(todo)" ng-show="todo.done === false">
                  <uif-icon uif-type="check"></uif-icon>
                </uif-list-item-action>
                <uif-list-item-action ng-click="vm.undoTodo(todo)" ng-show="todo.done">
                  <uif-icon uif-type="reactivate"></uif-icon>
                </uif-list-item-action>
                <uif-list-item-action ng-click="vm.deleteTodo(todo)">
                  <uif-icon uif-type="trash"></uif-icon>
                </uif-list-item-action>
              </uif-list-item-actions>
            </uif-list-item>
          </uif-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}