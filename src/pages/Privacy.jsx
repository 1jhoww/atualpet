import LegalDocument from '../components/LegalDocument'
import { privacyPolicy } from '../data/legal'

export default function Privacy() {
  return <LegalDocument document={privacyPolicy} path="/politica-de-privacidade" />
}
