import type { VehicleData } from "@/app/api/vehicle-data/route";

interface DataTableProps {
  data: VehicleData;
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Parameter
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Temperature
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.temperature}°F
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Engine Oil Level
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.engineOilLevel}%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Seats
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.seats}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Ticket Price
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${data.ticketPrice.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Latitude
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.latitude}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Longitude
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.longitude}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
