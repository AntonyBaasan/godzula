// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        await browser.wait(ec.visibilityOf(sectionComponentsPage.title), 5000);
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
            sectionUpdatePage.targetMachineSelectLastOption(),
            sectionUpdatePage.setOrderInput('5'),
            sectionUpdatePage.courseSelectLastOption()
        ]);
        expect(await sectionUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await sectionUpdatePage.getDescriptionInput()).to.eq(
            'description',
            'Expected Description value to be equals to description'
        );
        expect(await sectionUpdatePage.getOrderInput()).to.eq('5', 'Expected order value to be equals to 5');
        await sectionUpdatePage.save();
        // tslint:disable-next-line:no-unused-expression
        expect(await sectionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await sectionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
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
