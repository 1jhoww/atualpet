import LegalDocument from '../components/LegalDocument'
import { termsOfUse } from '../data/legal'

export default function Terms() {
  return <LegalDocument document={termsOfUse} path="/termos-de-uso" />
}
