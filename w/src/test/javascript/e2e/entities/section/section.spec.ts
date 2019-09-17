/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SectionComponentsPage, SectionDeleteDialog, SectionUpdatePage } from './section.page-object';

const expect = chai.expect;

describe('Section e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sectionUpdatePage: SectionUpdatePage;
    let sectionComponentsPage: SectionComponentsPage;
    let sectionDeleteDialog: SectionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Sections', async () => {
        await navBarPage.goToEntity('section');
        sectionComponentsPage = new SectionComponentsPage();
        expect(await sectionComponentsPage.getTitle()).to.eq('Sections');
    });

    it('should load create Section page', async () => {
        await sectionComponentsPage.clickOnCreateButton();
        sectionUpdatePage = new SectionUpdatePage();
        expect(await sectionUpdatePage.getPageTitle()).to.eq('Create or edit a Section');
        await sectionUpdatePage.cancel();
    });

    it('should create and save Sections', async () => {
        const nbButtonsBeforeCreate = await sectionComponentsPage.countDeleteButtons();

        await sectionComponentsPage.clickOnCreateButton();
        await promise.all([
            sectionUpdatePage.setNameInput('name'),
            sectionUpdatePage.setDescriptionInput('description'),
            sectionUpdatePage.statusSelectLastOption(),
            sectionUpdatePage.targetMachineSelectLastOption()
        ]);
        expect(await sectionUpdatePage.getNameInput()).to.eq('name');
        expect(await sectionUpdatePage.getDescriptionInput()).to.eq('description');
        await sectionUpdatePage.save();
        expect(await sectionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await sectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Section', async () => {
        const nbButtonsBeforeDelete = await sectionComponentsPage.countDeleteButtons();
        await sectionComponentsPage.clickOnLastDeleteButton();

        sectionDeleteDialog = new SectionDeleteDialog();
        expect(await sectionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Section?');
        await sectionDeleteDialog.clickOnConfirmButton();

        expect(await sectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
