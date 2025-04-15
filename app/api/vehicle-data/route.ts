import { type NextRequest, NextResponse } from "next/server"

export interface VehicleData {
  temperature: number
  engineOilLevel: number
  seats: number
  ticketPrice: number
  latitude: number
  longitude: number
}

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams

  // Parse parameters with defaults if not provided
  const temperature = Number.parseFloat(searchParams.get("temperature") || "0")
  const engineOilLevel = Number.parseFloat(searchParams.get("engineOilLevel") || "0")
  const seats = Number.parseInt(searchParams.get("seats") || "0")
  const ticketPrice = Number.parseFloat(searchParams.get("ticketPrice") || "0")
  const latitude = Number.parseFloat(searchParams.get("latitude") || "0")
  const longitude = Number.parseFloat(searchParams.get("longitude") || "0")

  // Create data object
  const data: VehicleData = {
    temperature,
    engineOilLevel,
    seats,
    ticketPrice,
    latitude,
    longitude,
  }

  // Return the data
  return NextResponse.json(data)
}
