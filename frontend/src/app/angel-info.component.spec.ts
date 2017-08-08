import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

import { KeysPipe } from "./keys.pipe";

import { AngelInfoComponent } from './angel-info.component';

describe('Angel info', () => {

  let comp:    AngelInfoComponent;
  let fixture: ComponentFixture<AngelInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysPipe, AngelInfoComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(AngelInfoComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

  });

  it('should display panel title', () => {
    const de = fixture.debugElement.query(By.css('.panel-heading'));
    const el = de.nativeElement;
    expect(el.textContent).toContain("Details");
  });

  it('should display angel properties', () => {
    comp.angel = {
      id: "qwerty",
      first_name: "Test",
      last_name: "Testerson",
      email: "test@test.test",
      phone: "1234567890",
      city: "TestCity",
      country: "Testland",
      bio: "Tester",
      auth0_id: "",
    };
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.propLabel'));
    const el = de.map(d => d.nativeElement);
    expect(el.map(e => e.textContent)).toContain("first_name");
  });

});
