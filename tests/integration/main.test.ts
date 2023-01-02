import {RunOptions, RunTarget} from 'github-action-ts-run-api';
import * as os from "os";

describe('action main', () => {
    const target = RunTarget.jsFile('./lib/src/main.js', 'action.yaml');

    test('correct input', async () => {
        const result = await target.run(
            RunOptions.create().setInputs({ name: 'abc' })
        );

        expect(result.isSuccess).toEqual(true);
        expect(result.stdout).toEqual('my name is abc' + os.EOL);
    })

    test('missed input', async () => {
        const result = await target.run(
            RunOptions.create()
        );

        expect(result.isSuccess).toEqual(false);
        expect(result.exitCode).toEqual(1);
        expect(result.commands.errors.length).toEqual(1)
        expect(result.commands.errors[0]).toEqual('Error: Input required and not supplied: name')
    })
})