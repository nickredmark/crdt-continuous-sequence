import { ContinuousSequence } from './ContinuousSequence'

export class GunContinuousSequence extends ContinuousSequence {
    constructor(private gun: any) {
        super();
    }

    getId = (element: any) => typeof element === 'string' ? element : element['_']['#']

    setIndex = (element: any, index: string[]) => this.gun.get(this.getId(element)).get('index').put(JSON.stringify(index))
}