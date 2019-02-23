export class SunAndMoonConfigCtrl {

  constructor() {
    // Flatten jsonData.position.* originating from older settings.
    if ('position' in this.current.jsonData) {
      this.current.jsonData.latitude = this.current.jsonData.position.latitude;
      this.current.jsonData.longitude = this.current.jsonData.position.longitude;
      delete this.current.jsonData.position;
    }
  }
}

SunAndMoonConfigCtrl.templateUrl = 'partials/config.html';
