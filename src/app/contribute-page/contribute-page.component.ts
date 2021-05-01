import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { ApiService, ContributeResult } from '../api-service.service';

export interface ContributeForm {
  email: string;
  manufacturer: string;
  model: string;
  provider: string;
  message: string;
  captcha: string;
}

@Component({
  selector: 'app-contribute-page',
  templateUrl: './contribute-page.component.html',
  styleUrls: ['./contribute-page.component.css']
})
export class ContributePageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private api: ApiService,
  ) { }

  faquestioncircle = faQuestionCircle;

  ngOnInit(): void {
    this.titleService.setTitle('Contribute | 4G/5G Bands & Combos');

    this.metaTagService.updateTag({ name: 'description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });

    this.metaTagService.updateTag({ property: 'og:title', content: 'Contribute | 4G/5G Bands & Combos' });
    this.metaTagService.updateTag({ property: 'og:description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });

    this.metaTagService.updateTag({ name: 'twitter:title', content: 'Contribute | 4G/5G Bands & Combos' });
    this.metaTagService.updateTag({ name: 'twitter:description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });
  }

  get isBrowser(): boolean {
    return this.api.isBrowser;
  }

  fileToUpload: File = null;
  formData: ContributeForm = { email: '', manufacturer: '', model: '', provider: '', message: '', captcha: '' }

  error: string;
  contributeResults: ContributeResult;
  submitDisabled: boolean;
  // Client Side validation
  clientSideError: boolean = false;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // Check Email validation https://ui.dev/validate-email-address-javascript/
  emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  submitForm() {
    this.submitDisabled = true;

    this.api.PostContributeForm(this.fileToUpload, this.formData).subscribe(contributeResults => {
      this.contributeResults = contributeResults;
      this.submitDisabled = false;
      if (contributeResults.status) {
        this.formData = { email: '', manufacturer: '', model: '', provider: '', message: '', captcha: '' };
        this.fileToUpload = null;
      }
      else {
        this.formData = { email: this.formData.email, manufacturer: this.formData.manufacturer, model: this.formData.model, provider: this.formData.provider, message: this.formData.message, captcha: null };
      }
    }, error => this.error = error);
  }

}
