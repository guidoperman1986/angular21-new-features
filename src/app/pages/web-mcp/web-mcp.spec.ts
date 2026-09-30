import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideExperimentalWebMcpForms, submit } from '@angular/forms/signals';
import { getWebMcpRegistry, installWebMcpPolyfill } from '../../webmcp-polyfill';
import { WebMcp } from './web-mcp';

async function whenToolRegistered(name: string) {
  const deadline = Date.now() + 2000;
  while (Date.now() < deadline) {
    if (getWebMcpRegistry()?.tools().some((tool) => tool.name === name)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error(`WebMCP tool "${name}" was not registered`);
}

describe('WebMcp', () => {
  let component: WebMcp;
  let fixture: ComponentFixture<WebMcp>;

  beforeEach(async () => {
    installWebMcpPolyfill();
    await TestBed.configureTestingModule({
      imports: [WebMcp],
      providers: [provideExperimentalWebMcpForms()],
    }).compileComponents();

    fixture = TestBed.createComponent(WebMcp);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds a registration on valid submit', async () => {
    component.model.set({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      age: 36,
      newsletter: true,
    });
    fixture.detectChanges();

    await submit(component.registerForm);

    expect(component.users().length).toBe(1);
    expect(component.users()[0].email).toBe('ada@example.com');
  });

  it('registers registerUser and accepts a valid agent call', async () => {
    await whenToolRegistered('registerUser');

    const result = await getWebMcpRegistry()!.callTool('registerUser', {
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      age: 36,
      newsletter: true,
    });

    expect(JSON.stringify(result)).toContain('Form submitted successfully');
    expect(component.users().length).toBe(1);
  });
});
