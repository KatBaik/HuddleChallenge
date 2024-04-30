WITH cte1_generaldata AS (
	SELECT h.id AS "houseContractId", h."houseId" FROM "HouseContract" h
	LEFT JOIN "Service" s ON s."houseContractId" = h.id
	WHERE "billingType" = 'BILL' AND "isPortfolio" IS FALSE 
		AND "utilityType" = 'electric' AND "utilityStatus" = 'ACTIVE'
),

cte2_meterdata AS (
	SELECT "houseId" FROM "MPxN" mp 
	LEFT JOIN "Meter" me ON mp.id = me."mpxnId" 
	LEFT JOIN (
		SELECT DISTINCT "meterId", MAX("meterReadingDate") OVER (PARTITION BY "meterId") as "MaxReadingDate"
		FROM "TenantReading" ) AS la ON la."meterId" = me.id
	WHERE "utilityType" = 'electric' AND NOT "meterType" = 'SMART' AND "MaxReadingDate" < NOW() - INTERVAL '31 days'
),

cte3_tenants AS (
	SELECT *, tc.id AS "tenantContractId" FROM "Tenant" t LEFT JOIN "TenantContract" tc ON t.id = "tenantId"
)

SELECT cte1_generaldata."houseContractId" AS "houseContractId", "tenantContractId", "tenantId",  "firstName", "lastName", email, phone 
FROM cte1_generaldata 
INNER JOIN cte2_meterdata ON cte2_meterdata."houseId" = cte1_generaldata."houseId"
INNER JOIN cte3_tenants ON cte1_generaldata."houseContractId" = cte3_tenants."houseContractId";