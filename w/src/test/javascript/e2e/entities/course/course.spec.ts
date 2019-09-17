/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CourseComponentsPage, CourseDeleteDialog, CourseUpdatePage } from './course.page-object';

const expect = chai.expect;

describe('Course e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let courseUpdatePage: CourseUpdatePage;
    let courseComponentsPage: CourseComponentsPage;
    let courseDeleteDialog: CourseDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Courses', async () => {
        await navBarPage.goToEntity('course');
        courseComponentsPage = new CourseComponentsPage();
        expect(await courseComponentsPage.getTitle()).to.eq('Courses');
    });

    it('should load create Course page', async () => {
        await courseComponentsPage.clickOnCreateButton();
        courseUpdatePage = new CourseUpdatePage();
        expect(await courseUpdatePage.getPageTitle()).to.eq('Create or edit a Course');
        await courseUpdatePage.cancel();
    });

    it('should create and save Courses', async () => {
        const nbButtonsBeforeCreate = await courseComponentsPage.countDeleteButtons();

        await courseComponentsPage.clickOnCreateButton();
        await promise.all([
            courseUpdatePage.setNameInput('name'),
            courseUpdatePage.setDescriptionInput('description'),
            courseUpdatePage.setImageUrlInput('imageUrl'),
            courseUpdatePage.statusSelectLastOption()
        ]);
        expect(await courseUpdatePage.getNameInput()).to.eq('name');
        expect(await courseUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await courseUpdatePage.getImageUrlInput()).to.eq('imageUrl');
        await courseUpdatePage.save();
        expect(await courseUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await courseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Course', async () => {
        const nbButtonsBeforeDelete = await courseComponentsPage.countDeleteButtons();
        await courseComponentsPage.clickOnLastDeleteButton();

        courseDeleteDialog = new CourseDeleteDialog();
        expect(await courseDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Course?');
        await courseDeleteDialog.clickOnConfirmButton();

        expect(await courseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
