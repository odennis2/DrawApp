import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', [
    'observe',
  ]);
  const isHandsetSubject = new BehaviorSubject<BreakpointState>({
    matches: false,
    breakpoints: {},
  });
  breakpointObserverSpy.observe.and.returnValue(
    isHandsetSubject.asObservable(),
  );

  const activatedRouteStub = {
    snapshot: {
      paramMap: new Map<string, string>().set('paramName', 'paramValue'),
      queryParamMap: new Map<string, string>().set(
        'queryParamName',
        'queryParamValue',
      ),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        RouterModule,
        RouterTestingModule,
      ],
      providers: [
        MatNavList,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
