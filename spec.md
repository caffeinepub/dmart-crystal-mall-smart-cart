# DMart Crystal Mall Smart Cart

## Current State

The app is a single-page React website with:
- Navbar with logo and nav links (Home, How It Works, Features, Demo, Checkout, Benefits)
- Hero section with animated cart visual
- How It Works (4-step flow)
- Features section (6 cards)
- Interactive Demo section (`#demo`) — left panel shows a barcode scanner UI with camera integration (Start/Stop Camera buttons, live video feed via `useCamera` hook), plus a list of 6 demo products (click to "scan"). Right panel shows a Digital Cart with quantity controls, remove buttons, subtotal, GST (18%), and a "Generate Bill" button locked until payment is complete.
- Payment Checkout section (`#checkout`) — UPI (QR code + UPI ID field), Card (fields for card number, expiry, CVV, name), Cash at Counter. Animated success screen on completion. Dynamic UPI QR encodes the grand total.
- Benefits section (customer-focused)
- About Project panel (Atmiya University, Dept of Management, 2025-26, Ms. Devanshi Dave)
- PRODUCTS data: 6 items with id, name, barcode, price, icon
- CartState: `Record<number, CartItem>` — shared between Demo and Checkout sections

## Requested Changes (Diff)

### Add
- A new dedicated page section: **"Add Product via Barcode Scanner"** (`id="barcode-scanner"`) — a full feature section separate from (but linked to) the existing Demo section.
- Nav link for "Barcode Scanner" in NAV_LINKS and mobile menu.
- **BarcodeScanner section UI** with two panels:
  1. **Left panel — Scanner & Product Fetch**
     - Tab toggle: "Camera Scan" | "Manual Barcode Entry"
     - Camera Scan tab: Live webcam feed using the existing `useCamera` hook. A "Scan Product" button that simulates scanning by randomly picking a barcode from PRODUCTS (or a custom barcode input). Show a "Scanning..." animated overlay.
     - Manual Barcode Entry tab: Input field for barcode number + "Look Up Product" button.
     - After scan/lookup: If barcode matches a known product, display a Product Card showing: product emoji icon, Product Name, Price, Category (derived from name), Available Quantity (simulated stock), and an "Add to Cart" button.
     - If barcode not found: Show message "Product not found. Add product details manually." and reveal a Manual Product Entry form.
     - Manual Product Entry form fields: Product Name, Price, Category (text input), Upload Product Image (file input). Button: "Save & Add to Cart".
  2. **Right panel — Real-Time Cart** (mirrors the existing Digital Cart from the Demo section, shares the same `cart` state — no duplicate state, same `CartState`)
     - Cart items list with quantity controls and remove buttons
     - Running total with GST breakdown
     - "Proceed to Checkout" button that scrolls to `#checkout`
- PRODUCTS data: Add `category` and `stock` fields to each product for the product detail display.
- Sound effect (short beep using Web Audio API) when a product is successfully scanned/found.
- "Scanning..." animated loading overlay on the camera scan window during simulated scan.
- Innovation callout badge/banner at top of section: "Queue-Free Smart Checkout · C2P (Concept to Practice) Innovation · Designed to Reduce Billing Counter Wait Time"

### Modify
- `PRODUCTS` array: add `category: string` and `stock: number` fields to all 6 existing items.
- `Product` interface: add `category` and `stock` fields.
- NAV_LINKS: add `{ label: "Barcode Scanner", href: "#barcode-scanner" }` between "Features" and "Demo".
- Mobile menu: include the new nav link.

### Remove
- Nothing removed.

## Implementation Plan

1. Extend `Product` interface with `category: string` and `stock: number`.
2. Update all 6 entries in `PRODUCTS` with appropriate categories and stock quantities.
3. Add `{ label: "Barcode Scanner", href: "#barcode-scanner" }` to `NAV_LINKS`.
4. Build `BarcodeScannerSection` component that:
   - Accepts `cart` and `setCart` as props (same state as DemoSection).
   - Has local state: `activeTab` (camera | manual), `barcodeInput`, `scanState` (idle | scanning | found | not-found), `foundProduct`, `manualForm` fields, `manualImagePreview`.
   - Camera tab: uses `useCamera` hook (same pattern as DemoSection). "Scan Product" button triggers a simulated scan — 1.5s scanning animation — then picks a matching product from PRODUCTS or marks as not-found for unknown barcodes.
   - Manual tab: text input for barcode + "Look Up Product" button; on submit, searches PRODUCTS array.
   - Product card display on found: shows emoji/image, name, category, price, stock badge, "Add to Cart" button.
   - Not-found state: shows error message + manual entry form with name, price, category, image upload. "Save & Add to Cart" creates a temporary product entry and adds to cart.
   - Cart panel on right: reuses same render logic as Demo cart panel (or extracts shared `CartPanel` subcomponent).
   - Web Audio API beep on successful scan.
   - Innovation banner at top of section.
5. Insert `<BarcodeScannerSection>` in `App` JSX between FeaturesSection and DemoSection.
6. Add `data-ocid` markers to all interactive elements in the new section.
