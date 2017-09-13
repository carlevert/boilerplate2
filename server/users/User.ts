import * as fs from "fs"
import * as path from "path"

export interface User {
    username: string;
    password: string;
    id: number;
}

export class Users {
    filename = path.resolve("server/users/users.json");
    users: User[] = [];
    persist = true;

    constructor() {
        this.loadUsersFromFile();
        console.log(this.filename);
    }

    loadUsersFromFile() {
        const users = fs.readFileSync(this.filename, "utf8");
        const parsed = JSON.parse(users);
        if (Array.isArray(parsed)) {
            parsed.forEach(item => {
                if (typeof item.id == "number" &&
                    typeof item.username == "string" &&
                    typeof item.password == "string") {
                    this.users.push(item);
                }
            });
        }
    }

    saveUsersToFile() {
        if (!this.persist)
            return;
        const strContent = JSON.stringify(this.users);
        fs.writeFileSync(this.filename, JSON.stringify(this.users));
    }

    nextId() {
        return 1 + this.users.reduce((prev, curr) => curr.id > prev.id ? curr : prev, { id: 0 }).id;
    }

    addUser(username, password) {
        const alreadyRegistered = this.users.find(user => user.username == username) != undefined;
        if (!alreadyRegistered) {
            this.users.push({
                id: this.nextId(),
                username,
                password
            });
            this.saveUsersToFile();
        }
    }

    deleteUser(username, password) {
        this.users = this.users.filter(user => !(user.username == username && user.password == password));
        this.saveUsersToFile();
    }

    validUser(username: string, password: string) {
        console.log(JSON.stringify(this.users));
        return this.users.find(user => user.username == username && user.password == password);
    }
    getUserById(id: number) {
        return this.users.find(user => user.id == id);
    }
}