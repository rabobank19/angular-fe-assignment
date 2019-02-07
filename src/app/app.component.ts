import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'read-csv-file-app';
  headingContent = [];
  headers = [];
  filecontent = [];
  invalidFileFormat : boolean =  false;
  onFileUpload(event) {
    this.invalidFileFormat = false;
    if(event.target.files[0].name.split('.').pop() === 'csv') {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsText(file);
        reader.onload = () => {
          var lines = (<string>reader.result).replace(/\"/g, '').split("\n");
          var result = [];
          this.headers = lines[0].split(",");
          for (var i = 1; i < lines.length; i++) {
              var obj = {};
              var currentline = lines[i].split(",");
              for (var j = 0; j < this.headers.length; j++) {
                obj[this.headers[j]] = currentline[j];
              }
              result.push(obj);
          }
          this.filecontent = result;
        };
      }
    } else {
      this.invalidFileFormat = true;
    }
  }
}
