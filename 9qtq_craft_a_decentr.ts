interface IUser {
  id: string;
  username: string;
  walletAddress: string;
  profilePicture: string;
}

interface IProject {
  id: string;
  title: string;
  description: string;
  creator: IUser;
  contributors: IUser[];
  blockchain: 'ethereum' | 'polygon' | 'binance';
  contractAddress: string;
}

interface ITask {
  id: string;
  title: string;
  description: string;
  project: IProject;
  assignedTo: IUser;
  status: 'pending' | 'in_progress' | 'completed';
}

interface IDashboard {
  users: IUser[];
  projects: IProject[];
  tasks: ITask[];
}

interface IBlockchainTransaction {
  id: string;
  type: 'create_project' | 'update_project' | 'add_contributor' | 'assign_task' | 'update_task_status';
  data: any;
  transactionHash: string;
  timestamp: number;
}

interface IEventLog {
  transactions: IBlockchainTransaction[];
}

const dashboard: IDashboard = {
  users: [],
  projects: [],
  tasks: [],
};

class DecentrDashboard {
  private eventLog: IEventLog;

  constructor() {
    this.eventLog = { transactions: [] };
  }

  createUser(user: IUser) {
    dashboard.users.push(user);
    this.logEvent('create_user', user);
  }

  createProject(project: IProject) {
    dashboard.projects.push(project);
    this.logEvent('create_project', project);
  }

  createTask(task: ITask) {
    dashboard.tasks.push(task);
    this.logEvent('create_task', task);
  }

  private logEvent(type: string, data: any) {
    const transaction: IBlockchainTransaction = {
      id: crypto.randomUUID(),
      type,
      data,
      transactionHash: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    this.eventLog.transactions.push(transaction);
  }
}

export { DecentrDashboard, IDashboard, IProject, ITask, IUser, IBlockchainTransaction, IEventLog };