import { element, by, ElementFinder } from 'protractor';

export class TaskComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-task div table .btn-danger'));
    title = element.all(by.css('jhi-task div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class TaskUpdatePage {
    pageTitle = element(by.id('jhi-task-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    questionInput = element(by.id('field_question'));
    descriptionInput = element(by.id('field_description'));
    answerInput = element(by.id('field_answer'));
    typeSelect = element(by.id('field_type'));
    targetMachineSelect = element(by.id('field_targetMachine'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setQuestionInput(question) {
        await this.questionInput.sendKeys(question);
    }

    async getQuestionInput() {
        return this.questionInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setAnswerInput(answer) {
        await this.answerInput.sendKeys(answer);
    }

    async getAnswerInput() {
        return this.answerInput.getAttribute('value');
    }

    async setTypeSelect(type) {
        await this.typeSelect.sendKeys(type);
    }

    async getTypeSelect() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    async typeSelectLastOption() {
        await this.typeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setTargetMachineSelect(targetMachine) {
        await this.targetMachineSelect.sendKeys(targetMachine);
    }

    async getTargetMachineSelect() {
        return this.targetMachineSelect.element(by.css('option:checked')).getText();
    }

    async targetMachineSelectLastOption() {
        await this.targetMachineSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class TaskDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-task-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-task'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
