# FIXBUG

## Resolved Issues

1. **Server helper imports still leaking into client bundles** [FIXED]
   - All App Router pages in `/app/admin/*` and elsewhere have been updated to import from `*PresenterServerFactory` files directly.
   
2. **`createServerSupabaseClient` bundling into client** [FIXED]
   - Direct imports and barrel file cleanups have removed references from client code.

3. **Barrel exports review** [FIXED]
   - Fixed `src/presentation/presenters/admin/analytics/index.ts` which was incorrectly exporting a ServerFactory.
   - Audited remaining barrel files to ensure no accidental re-exports.

## Next Steps

1. Rerun `yarn build` to verify `next/headers` error is resolved. [READY]
2. Document any additional errors discovered after the build.

