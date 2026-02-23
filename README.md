# Project Quick Start

This project uses [TanStack Start](https://tanstack.com/start) and [Tailwind CSS](https://tailwindcss.com/). For detailed routing, data-fetching, and server function examples, please refer to [`TANSTACK_README.md`](./TANSTACK_README.md).

## Development Commands

**Install dependencies**
```bash
pnpm install
```

**Start the development server**

```bash
pnpm dev
```

**Build for production**

```bash
pnpm build
```

## UI & Components (shadcn/ui)

This project uses `shadcn/ui` for its component library.

**Add a new component**

```bash
pnpm dlx shadcn@latest add <component-name>
```

* Example: `pnpm dlx shadcn@latest add button`


Here is the updated section for your `README.md`. I added a sub-section specifically for the auto-fix commands, including the `--unsafe` flag we just discussed, so you always have it handy if you need to clean up the whole project at once.

---

## Code Quality & Testing

This project uses [Biome](https://biomejs.dev/) for linting/formatting and [Vitest](https://vitest.dev/) for testing.

**Run tests**
```bash
pnpm test
```

**Lint code (Check only)**

```bash
pnpm lint
```

**Format code (Check only)**

```bash
pnpm format
```

**Run type-checking and linting**

```bash
pnpm check
```

### Biome Auto-Fix Commands

While your editor should handle most formatting and safe fixes on save, you can run these commands to automatically clean up the entire project at once:

**Format and apply all safe linting fixes**

```bash
pnpm dlx @biomejs/biome check --write .
```

## Image Optimization
use [Squoosh](https://squoosh.app/) to optimize images before adding them to the project. This helps reduce file sizes and improve load times without sacrificing quality.

## Favicons

Use [RealFaviconGenerator](https://realfavicongenerator.net/) to create favicons for your project.