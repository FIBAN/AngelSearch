import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

import { SearchFilterPipe } from "./search.pipe";

import { AngelsComponent } from './angels.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { AngelService } from "./angel.service";
import { AuthService } from "./auth.service";

describe('Angels list', () => {

  let comp:    AngelsComponent;
  let fixture: ComponentFixture<AngelsComponent>;

  const angelServiceStub = {
    getAngels: () =>  Promise.resolve([
        {
          id: "qwerty",
          first_name: "Test",
          last_name: "Testerson",
          email: "test@test.test",
          phone: "1234567890",
          city: "TestCity",
          country: "Testland",
          bio: "Tester",
          auth0_id: "",
        }
      ]
    )
  };

  const authServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule, NgxDatatableModule ],
      declarations: [ SearchFilterPipe, AngelsComponent ], // declare the test component
      providers: [
        {provide: AngelService, useValue: angelServiceStub},
        {provide: AuthService, useValue: authServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngelsComponent);
    comp = fixture.componentInstance; // BannerComponent test instance
    fixture.detectChanges();
  });

  it('should display page title', () => {
    const de = fixture.debugElement.query(By.css('h3'));
    const el = de.nativeElement;
    expect(el.textContent).toContain("Business Angels");
  });


});
