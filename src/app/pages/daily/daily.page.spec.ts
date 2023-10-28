import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPage } from './daily.page';

describe('DailyPage', () => {
  let page: DailyPage;
  let fixture: ComponentFixture<DailyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyPage);
    page = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page).toBeTruthy();
  });
});
