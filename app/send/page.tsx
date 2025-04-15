import { DataTable } from "@/components/data-table";
import { MapView } from "@/components/map-view";
import { PaymentQR } from "@/components/payment-qr";
import type { VehicleData } from "@/app/api/vehicle-data/route";

export default function SendPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  // Check if we have any parameters
  const hasParams = Object.keys(searchParams || {}).length > 0;

  // If no parameters, show empty state with loading animation
  if (!hasParams) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Vehicle Data</h1>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-800 mb-4"></div>
          <p className="text-lg text-gray-500">Waiting for data...</p>
          <p className="text-sm text-gray-400 mt-2">
            Add parameters to the URL to see data
          </p>
        </div>
      </div>
    );
  }

  // Fetch data from our API
  // Create a clean object with only the string values
  const cleanParams: Record<string, string> = {};
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // Handle both string and string[] cases
      const stringValue = Array.isArray(value) ? value[0] : value;
      if (stringValue) {
        cleanParams[key] = stringValue;
      }
    }
  });

  // Use a server action to fetch data
  const getData = async () => {
    const queryString = new URLSearchParams(cleanParams).toString();
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/vehicle-data?${queryString}`,
      {
        cache: "no-store",
      }
    );
    return response.json();
  };

  // UPI ID for payment
  const upiId = "9880020224@ybl";

  // Use React's suspense for async data
  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-3xl font-bold">Vehicle Data</h1>

      <DataTableWithData getData={getData} upiId={upiId} />
    </div>
  );
}

// Create a client component to handle the async data
async function DataTableWithData({
  getData,
  upiId,
}: {
  getData: () => Promise<VehicleData>;
  upiId: string;
}) {
  // Fetch the data
  const data = await getData();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <DataTable data={data} />
        </div>

        {/* Payment QR Code */}
        {data.ticketPrice > 0 && (
          <div className="flex justify-center">
            <PaymentQR amount={data.ticketPrice} upiId={upiId} />
          </div>
        )}
      </div>

      {/* Map view using latitude and longitude */}
      {data.latitude && data.longitude && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <MapView latitude={data.latitude} longitude={data.longitude} />
        </div>
      )}
    </>
  );
}
