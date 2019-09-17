import { ObjectID } from 'bson';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdGeneratorService {
    generateNewId(): string {
        return new ObjectID().toString();
    }
}
