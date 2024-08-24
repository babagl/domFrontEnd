import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCrudComponent } from './default-crud.component';

describe('DefaultCrudComponent', () => {
  let component: DefaultCrudComponent;
  let fixture: ComponentFixture<DefaultCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
