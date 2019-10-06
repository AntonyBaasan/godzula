/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { KeyinputComponentsPage, KeyinputDeleteDialog, KeyinputUpdatePage } from './keyinput.page-object';

const expect = chai.expect;

describe('Keyinput e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let keyinputUpdatePage: KeyinputUpdatePage;
    let keyinputComponentsPage: KeyinputComponentsPage;
    let keyinputDeleteDialog: KeyinputDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Keyinputs', async () => {
        await navBarPage.goToEntity('keyinput');
        keyinputComponentsPage = new KeyinputComponentsPage();
        expect(await keyinputComponentsPage.getTitle()).to.eq('Keyinputs');
    });

    it('should load create Keyinput page', async () => {
        await keyinputComponentsPage.clickOnCreateButton();
        keyinputUpdatePage = new KeyinputUpdatePage();
        expect(await keyinputUpdatePage.getPageTitle()).to.eq('Create or edit a Keyinput');
        await keyinputUpdatePage.cancel();
    });

    it('should create and save Keyinputs', async () => {
        const nbButtonsBeforeCreate = await keyinputComponentsPage.countDeleteButtons();

        await keyinputComponentsPage.clickOnCreateButton();
        await promise.all([
            keyinputUpdatePage.setQuestionInput('question'),
            keyinputUpdatePage.setMacAnsInput('macAns'),
            keyinputUpdatePage.setWinAnsInput('winAns'),
            keyinputUpdatePage.typeSelectLastOption(),
            keyinputUpdatePage.setClickAmountInput('5'),
            keyinputUpdatePage.targetMachineSelectLastOption()
        ]);
        expect(await keyinputUpdatePage.getQuestionInput()).to.eq('question');
        expect(await keyinputUpdatePage.getMacAnsInput()).to.eq('macAns');
        expect(await keyinputUpdatePage.getWinAnsInput()).to.eq('winAns');
        expect(await keyinputUpdatePage.getClickAmountInput()).to.eq('5');
        await keyinputUpdatePage.save();
        expect(await keyinputUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await keyinputComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Keyinput', async () => {
        const nbButtonsBeforeDelete = await keyinputComponentsPage.countDeleteButtons();
        await keyinputComponentsPage.clickOnLastDeleteButton();

        keyinputDeleteDialog = new KeyinputDeleteDialog();
        expect(await keyinputDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Keyinput?');
        await keyinputDeleteDialog.clickOnConfirmButton();

        expect(await keyinputComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
