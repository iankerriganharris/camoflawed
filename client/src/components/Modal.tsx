import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface IModalProps {
  open?: boolean
  closeFunction?: () => void
  children?: ReactNode
}

const StyledModal = styled.div`
  display: ${({ open }: IModalProps) => (open ? 'grid' : 'none')};
  /* Probably need media queries here */
  width: 600px;
  max-width: 100%;

  height: 400px;
  max-height: 100%;

  position: fixed;

  z-index: 100;

  left: 50%;
  top: 50%;

  /* Use this for centering if unknown width/height */
  transform: translate(-50%, -50%);

  /* If known, negative margins are probably better (less chance of blurry text). */
  /* margin: -200px 0 0 -200px; */

  background: white;
  box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);

  ${(props: IModalProps) =>
    props.open ? 'grid-template-rows: 100px auto 100px;' : ''}
`

const ModalContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`
const CloseIcon = styled.div`
  position: absolute;
  top 5;
  left 5;
`

const ModalOverlay = styled.div`
  display: ${({ open }: IModalProps) => (open ? 'block' : 'none')};
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.25);
`

export const Modal = ({ open, children, closeFunction }: IModalProps) => (
  <>
    <ModalOverlay onClick={closeFunction} open={open} />
    <StyledModal open={open}>
      <ModalContent>
        <CloseIcon onClick={closeFunction}>x</CloseIcon>
        {children}
      </ModalContent>
    </StyledModal>
  </>
)
