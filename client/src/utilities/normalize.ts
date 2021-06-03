export function normalizeToString(value: any)
{
  return (value || "") + "";
}

export function normalizeToNumber(value: any)
{
  return (typeof value === "number") ? value : 0;
}