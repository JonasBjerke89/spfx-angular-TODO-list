import { IDataService, ITodo } from './DataService';

export default class HomeController {
  public isLoading: boolean = false;
  public newItem: string = null;
  public todoCollection: any[] = [];
  private sharePointApi: string = null;
  private todoListName: string = null;
  private hideFinishedTasks: boolean = false;
  private configurationNeeded: boolean = true;

  public static $inject: string[] = ['DataService', '$window', '$rootScope'];

  constructor(private dataService: IDataService, private $window: ng.IWindowService, private $rootScope: ng.IRootScopeService) {
    const vm: HomeController = this;
    this.init(null, null);

    $rootScope.$on('configurationChanged', (event: ng.IAngularEvent, args: { sharePointApi: string; todoListName: string; hideFinishedTasks: boolean }): void => {
      vm.init(args.sharePointApi, args.todoListName, args.hideFinishedTasks);
    });
  }

  private init(sharePointApi: string, todoListName: string, hideFinishedTasks?: boolean): void {
    if (sharePointApi != null && sharePointApi.length > 0 &&
      todoListName != null && todoListName.length > 0) {
      this.sharePointApi = sharePointApi;
      this.todoListName = todoListName;
      this.hideFinishedTasks = hideFinishedTasks;
      this.loadTodos();
      this.configurationNeeded = false;
    }
    else {
      this.configurationNeeded = true;
    }
  }

  private loadTodos(): void {
    const vm: HomeController = this;
    this.isLoading = true;
    this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
      .then((todos: ITodo[]): void => {
        vm.todoCollection = todos;
      })
      .finally((): void => {
        vm.isLoading = false;
      });
  }

  public todoKeyDown($event: any): void {
    if ($event.keyCode === 13 && this.newItem.length > 0) {
      $event.preventDefault();

      this.todoCollection.unshift({ id: -1, title: this.newItem, done: false });
      const vm: HomeController = this;

      this.dataService.addTodo(this.newItem, vm.sharePointApi, vm.todoListName)
        .then((): void => {
          this.newItem = null;
          this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
            .then((todos: any[]): void => {
              this.todoCollection = todos;
            });
        });
    }
  }

  public todoAdd($event: any): void {
    $event.preventDefault();

    if(this.newItem.length > 0) {
      this.todoCollection.unshift({ id: -1, title: this.newItem, done: false });
      const vm: HomeController = this;

      this.dataService.addTodo(this.newItem, vm.sharePointApi, vm.todoListName)
        .then((): void => {
          this.newItem = null;
          this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
            .then((todos: any[]): void => {
              this.todoCollection = todos;
            });
        });
    }
  }

  public deleteTodo(todo: ITodo): void {
    if (this.$window.confirm('Are you sure you want to delete this todo item?')) {
      let index: number = -1;
      for (let i: number = 0; i < this.todoCollection.length; i++) {
        if (this.todoCollection[i].id === todo.id) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        this.todoCollection.splice(index, 1);
      }

      const vm: HomeController = this;

      this.dataService.deleteTodo(todo, vm.sharePointApi, vm.todoListName)
        .then((): void => {
          this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
            .then((todos: any[]): void => {
              this.todoCollection = todos;
            });
        });
    }
  }

  public completeTodo(todo: ITodo): void {
    todo.done = true;

    const vm: HomeController = this;

    this.dataService.setTodoStatus(todo, true, vm.sharePointApi, vm.todoListName)
      .then((): void => {
        this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
          .then((todos: any[]): void => {
            this.todoCollection = todos;
          });
      });
  }

  public undoTodo(todo: ITodo): void {
    todo.done = false;

    const vm: HomeController = this;

    this.dataService.setTodoStatus(todo, false, vm.sharePointApi, vm.todoListName)
      .then((): void => {
        this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
          .then((todos: any[]): void => {
            this.todoCollection = todos;
          });
      });
  }
}