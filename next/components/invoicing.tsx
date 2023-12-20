import React from "react";

interface InvoicingProps {
  ref: string;
}

export const Invoicing = React.forwardRef<HTMLDivElement, InvoicingProps>(
  ({}, ref) => {
    return (
      <div ref={ref}>
        <div className="ml-10  mb-10 flex md:justify-end pt-10 overflow-hidden h-126">
          <p className="mt-8 md:mt-0 text-sm sm:text-base md:text-lg max-w-lg mr-14">
            Please note: Invoices sent to our visiting address or in any other
            way not described on this page are not handled. Electronic invoices
            (primary) Wunder Finland Oy Business ID: 2307947-9 OVT: 003723079479
            Operator: Apix Messaging Oy Operator ID: 0037223327487 The address
            for email scanning: 003723079479@procountor.apix.fi The actual
            invoice must be in the email as a PDF attachment. One email must
            only contain one invoice. If the email has other attachments they
            are included as attachments for the invoice. The maximum file size
            for email attachments is 2 MB. After the email is processed service
            will produce an automated acceptance or error reply email within 15
            minutes. Paper invoices Wunder Finland Oy (Apix scanning service)
            P.O. Box 16112 00021 LASKUTUS To enable the scanning service to
            recognize your invoice, the invoice address is to be printed on the
            actual invoice, not only on the envelope. Please note that no other
            material than invoices is allowed to be sent to this address.
          </p>
        </div>
      </div>
    );
  },
);
