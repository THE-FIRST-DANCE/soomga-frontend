import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 8px;
  color: #374151;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: fit-content;
  margin-left: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #e5e7eb;
    transform: translateX(-5px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }

  svg {
    margin-right: 8px;
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: translateX(-3px);
  }
`

interface BackButtonProps {
  onClick: () => void
}

export default function Component({ onClick }: BackButtonProps = { onClick: () => {} }) {
  return (
    <StyledButton onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      뒤로 가기
    </StyledButton>
  )
}
