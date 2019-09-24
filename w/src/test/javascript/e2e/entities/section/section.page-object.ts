import { element, by, ElementFinder } from 'protractor';

export class SectionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-section div table .btn-danger'));
    title = element.all(by.css('jhi-section div h2#page-heading span')).first();

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

export class SectionUpdatePage {
    pageTitle = element(by.id('jhi-section-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    descriptionInput = element(by.id('field_description'));
    statusSelect = element(by.id('field_status'));
    targetMachineSelect = element(by.id('field_targetMachine'));
    courseSelect = element(by.id('field_course'));

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

    async setTargetMachineSelect(targetMachine) {
        await this.targetMachineSelect.sendKeys(targetMachine);
    }

    async getTargetMachineSelect() {
        return await this.targetMachineSelect.element(by.css('option:checked')).getText();
    }

    async targetMachineSelectLastOption(timeout?: number) {
        await this.targetMachineSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async courseSelectLastOption(timeout?: number) {
        await this.courseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async courseSelectOption(option) {
        await this.courseSelect.sendKeys(option);
    }

    getCourseSelect(): ElementFinder {
        return this.courseSelect;
    }

    async getCourseSelectedOption() {
        return await this.courseSelect.element(by.css('option:checked')).getText();
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

export class SectionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-section-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-section'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton(timeout?: number) {
        await this.confirmButton.click();
    }
}
