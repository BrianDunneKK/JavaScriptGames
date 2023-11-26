import * as fs from 'fs';

class cdkkNode {
    static readFileSync(file, encoding = 'utf8') {
        let ret_contents = null;
        let ret_err = null;
        try {
            ret_contents = fs.readFileSync(file, encoding);
        } catch (err) {
            ret_err = err;
        }
        return { contents: ret_contents, err: ret_err }
    }
}

export { cdkkNode };

