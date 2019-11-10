import { ContinuousSequence } from '../src'

describe('Simple CRDT continuous sequence', () => {
    it('works', () => {

        const cs = new ContinuousSequence();

        const todos = [
            {
                id: 1,
                name: "Groceries"
            },
            {
                id: 2,
                name: "Cleaning"
            },
            {
                id: 3,
                name: "Admin"
            }
        ]


        cs.move(todos[2], todos[0], todos[1]);
        cs.sort(todos)
        expect(todos).toMatchSnapshot();
    })
})