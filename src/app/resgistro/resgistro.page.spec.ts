import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResgistroPage } from './resgistro.page';

describe('ResgistroPage', () => {
  let component: ResgistroPage;
  let fixture: ComponentFixture<ResgistroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
