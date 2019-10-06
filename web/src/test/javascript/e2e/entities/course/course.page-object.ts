import { element, by, ElementFinder } from 'protractor';

export class CourseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-course div table .btn-danger'));
    title = element.all(by.css('jhi-course div h2#page-heading span')).first();

    async clickOnCreateButton(timeout?: number) {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton(timeout?: number) {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class CourseUpdatePage {
    pageTitle = element(by.id('jhi-course-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    imageUrlInput = element(by.id('field_imageUrl'));
    statusSelect = element(by.id('field_status'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return await this.nameInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return await this.descriptionInput.getAttribute('value');
    }

    async setImageUrlInput(imageUrl) {
        await this.imageUrlInput.sendKeys(imageUrl);
    }

    async getImageUrlInput() {
        return await this.imageUrlInput.getAttribute('value');
    }

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return await this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption(timeout?: number) {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async save(timeout?: number) {
        await this.saveButton.click();
    }

    async cancel(timeout?: number) {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CourseDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-course-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-course'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton(timeout?: number) {
        await this.confirmButton.click();
    }
}
