export const stateNames = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins"
};

export const stateRegions = {
  AC: "Norte",
  AL: "Nordeste",
  AP: "Norte",
  AM: "Norte",
  BA: "Nordeste",
  CE: "Nordeste",
  DF: "Centro-Oeste",
  ES: "Sudeste",
  GO: "Centro-Oeste",
  MA: "Nordeste",
  MT: "Centro-Oeste",
  MS: "Centro-Oeste",
  MG: "Sudeste",
  PA: "Norte",
  PB: "Nordeste",
  PR: "Sul",
  PE: "Nordeste",
  PI: "Nordeste",
  RJ: "Sudeste",
  RN: "Nordeste",
  RS: "Sul",
  RO: "Norte",
  RR: "Norte",
  SC: "Sul",
  SP: "Sudeste",
  SE: "Nordeste",
  TO: "Norte"
};

function normalize(value = "") {
  return String(value)
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
const stateAliases = Object.fromEntries(
  Object.entries(stateNames).flatMap(([uf, name]) => [
    [normalize(uf), uf],
    [normalize(name), uf]
  ])
);

export function normalizeStateCode(value = "") {
  return stateAliases[normalize(value)] || "";
}

export function getServedStates(distributor) {
  return [distributor.state, ...(distributor.servedStates || [])]
    .map(normalizeStateCode)
    .filter((uf, index, states) => uf && states.indexOf(uf) === index);
}

export function servesState(distributor, state) {
  const normalizedState = normalizeStateCode(state);
  return Boolean(
    normalizedState && getServedStates(distributor).includes(normalizedState)
  );
}

export function getCoverageRegions(distributor) {
  return getServedStates(distributor)
    .map((uf) => stateRegions[uf])
    .filter(
      (region, index, regions) =>
        region && regions.indexOf(region) === index
    );
}

export function getCoverageSearchText(distributor) {
  const states = getServedStates(distributor);
  return [
    ...states,
    ...states.map((uf) => stateNames[uf]),
    ...getCoverageRegions(distributor)
  ].join(" ");
}

export function listCoveredStates(distributors) {
  return [...new Set(distributors.flatMap(getServedStates))].sort();
}

export function countCoverageByState(distributors) {
  return distributors.reduce((counts, distributor) => {
    getServedStates(distributor).forEach((uf) => {
      counts[uf] = (counts[uf] || 0) + 1;
    });
    return counts;
  }, {});
}
