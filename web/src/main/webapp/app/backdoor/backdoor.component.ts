import { Component, OnInit } from '@angular/core';
import { LoginModalService, LoginService, AccountService } from 'app/core';

/*
 * This component is create just for dev purpose
 */
@Component({
    selector: 'jhi-backdoor',
    templateUrl: './backdoor.component.html',
    styleUrls: ['./backdoor.component.css']
})
export class BackdoorComponent implements OnInit {
    userInfo: any;
    constructor(private loginService: LoginService, private accountService: AccountService, private loginModalService: LoginModalService) {}
    ngOnInit() {}

    login() {
        this.loginModalService.openThen().then(() => {
            this.getUserInfo();
        });
    }
    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    logout() {
        this.loginService.logout();
    }

    getUserInfo() {
        this.accountService.identity().then(r => {
            this.userInfo = r;
        });
    }
}
