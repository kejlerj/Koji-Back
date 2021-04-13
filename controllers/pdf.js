var formidable = require('formidable');
const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');

exports.convert = async (req, res) => {
    try {
        let form = new formidable.IncomingForm({
            uploadDir: __dirname + '/../temp/',
        });
        const pdf_path =
            form.uploadDir +
            Math.random().toString(36).substring(2, 10) +
            '.pdf';
        let path;
        form.on('file', async (field, file) => {
            // Rename the uploaded file
            path = form.uploadDir + file.name;
            fs.rename(file.path, path, (err) => {
                if (err) console.log('err');
            });
        });
        form.parse(req, async () => {
            // Generate PDF from uploaded file
            const pdf = await mdToPdf({ path }, { dest: pdf_path });
            if (pdf) fs.writeFileSync(pdf.filename, pdf.content);
            return res.download(pdf.filename);
        });
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
};
